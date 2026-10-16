-- Persist lobby bans. Clients only reach these tables through the functions
-- below: RLS with no policies blocks direct access, so knowing a lobby code is
-- required to read or change its bans.

create table public.lobbies (
  code text primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lobby_bans (
  lobby_code text not null references public.lobbies (code) on delete cascade,
  leader_id text not null,
  banned_by text,
  banned_at timestamptz not null default now(),
  primary key (lobby_code, leader_id)
);

alter table public.lobbies enable row level security;
alter table public.lobby_bans enable row level security;

-- Returns the lobby's bans. p_seed carries bans a browser saved locally before
-- bans were stored here; it is applied only when the lobby has no row yet, so
-- once the database owns a lobby, stale local copies cannot resurrect bans.
create function public.load_lobby_bans(p_lobby_code text, p_seed jsonb default null)
returns table (leader_id text, banned_by text, banned_at timestamptz)
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_seed is not null and jsonb_array_length(p_seed) > 0 then
    insert into public.lobbies (code) values (p_lobby_code)
    on conflict (code) do nothing;

    if found then
      insert into public.lobby_bans (lobby_code, leader_id, banned_by, banned_at)
      select p_lobby_code, s.leader_id, s.banned_by, coalesce(s.banned_at, now())
      from jsonb_to_recordset(p_seed) as s (leader_id text, banned_by text, banned_at timestamptz)
      on conflict do nothing;
    end if;
  end if;

  return query
    select b.leader_id, b.banned_by, b.banned_at
    from public.lobby_bans b
    where b.lobby_code = p_lobby_code;
end;
$$;

create function public.set_lobby_ban(
  p_lobby_code text,
  p_leader_id text,
  p_banned boolean,
  p_banned_by text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.lobbies (code) values (p_lobby_code)
  on conflict (code) do update set updated_at = now();

  if p_banned then
    insert into public.lobby_bans (lobby_code, leader_id, banned_by)
    values (p_lobby_code, p_leader_id, p_banned_by)
    on conflict do nothing;
  else
    delete from public.lobby_bans
    where lobby_code = p_lobby_code and leader_id = p_leader_id;
  end if;
end;
$$;

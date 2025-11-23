import rawLeaderData from '../../supabase/data/civ6leaderdata.json';
import type {
  BaseLeader,
  Civilization,
  UniqueInfrastructure,
  UniqueUnit,
} from '../lib/supabase';

type RawLeaderRow = {
  civilization: string;
  civilization_key: string;
  leader: string;
  leader_key: string;
  ability: string;
  unique_units: string;
  unit_keys: string;
  unique_infrastructure: string;
  infra_keys: string;
  civilization_bonus: string;
};

const BASE_CREATED_AT = '2024-01-01T00:00:00.000Z';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function buildUniqueUnits(
  namesRaw: string,
  keysRaw: string,
  civSlug: string
): UniqueUnit[] {
  const names = namesRaw
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean);
  const keys = keysRaw
    .split(',')
    .map((key) => key.trim())
    .filter(Boolean);

  if (!names.length || !keys.length) {
    return [];
  }

  if (names.length !== keys.length) {
    return [
      {
        id: `unit-${civSlug}-${slugify(names[0])}`,
        name: namesRaw.trim(),
        image_key: keys[0] ?? keysRaw.trim(),
      },
    ];
  }

  return names.map((name, index) => ({
    id: `unit-${civSlug}-${slugify(name)}`,
    name,
    image_key: keys[index],
  }));
}

function buildUniqueInfrastructure(
  namesRaw: string,
  keysRaw: string,
  civSlug: string
): UniqueInfrastructure[] {
  const names = namesRaw
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean);
  const keys = keysRaw
    .split(',')
    .map((key) => key.trim())
    .filter(Boolean);

  if (!names.length || !keys.length) {
    return [];
  }

  if (names.length !== keys.length) {
    return [
      {
        id: `infra-${civSlug}-${slugify(names[0])}`,
        name: namesRaw.trim(),
        image_key: keys[0] ?? keysRaw.trim(),
      },
    ];
  }

  return names.map((name, index) => ({
    id: `infra-${civSlug}-${slugify(name)}`,
    name,
    image_key: keys[index],
  }));
}

export const baseLeaders: BaseLeader[] = (rawLeaderData as RawLeaderRow[]).map(
  (row, index) => {
    const civSlug = slugify(row.civilization);

    const civilization: Civilization = {
      id: `civ-${civSlug}`,
      name: row.civilization,
      image_key: row.civilization_key,
      civilization_bonus: row.civilization_bonus,
      unique_units: buildUniqueUnits(
        row.unique_units ?? '',
        row.unit_keys ?? '',
        civSlug
      ),
      unique_infrastructure: buildUniqueInfrastructure(
        row.unique_infrastructure ?? '',
        row.infra_keys ?? '',
        civSlug
      ),
    };

    const leaderSlug = slugify(row.leader);

    const leader: BaseLeader = {
      id: `leader-${leaderSlug}-${index}`,
      name: row.leader,
      image_key: row.leader_key,
      ability: row.ability,
      created_at: BASE_CREATED_AT,
      civilization,
    };

    return leader;
  }
);

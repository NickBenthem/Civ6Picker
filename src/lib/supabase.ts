export type UniqueUnit = {
  id: string;
  name: string;
  image_key: string;
};

export type UniqueInfrastructure = {
  id: string;
  name: string;
  image_key: string;
};

export type Civilization = {
  id: string;
  name: string;
  image_key: string;
  civilization_bonus: string;
  unique_units: UniqueUnit[];
  unique_infrastructure: UniqueInfrastructure[];
};

export type BaseLeader = {
  id: string;
  name: string;
  image_key: string;
  ability: string;
  created_at: string;
  civilization: Civilization;
};

export type LeaderState = {
  id: string;
  is_banned: boolean;
  banned_by: string | null;
  banned_at: string | null;
};

export type Leader = BaseLeader & Omit<LeaderState, 'id'>;

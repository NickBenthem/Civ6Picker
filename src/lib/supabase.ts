// Types for the API response
export type UniqueUnit = {
  id: string;
  civilization_id: string;
  name: string;
  image_key: string;
  created_at: string;
};

export type UniqueInfrastructure = {
  id: string;
  civilization_id: string;
  name: string;
  image_key: string;
  created_at: string;
};

export type Civilization = {
  id: string;
  name: string;
  image_key: string;
  created_at: string;
  unique_units?: UniqueUnit[];
  unique_infrastructure?: UniqueInfrastructure[];
};

export type Leader = {
  id: string;
  name: string;
  civilization_id: string;
  image_key: string;
  ability: string;
  is_banned: boolean;
  banned_by: string | null;
  banned_at: string | null;
  created_at: string;
  civilization?: Civilization;
};

export type Vote = {
  id: string;
  leader_id: string;
  user_id: string;
  vote_type: string;
  created_at: string;
};

const API_URL = 'https://ymllyikqdmsbldxfzmdl.supabase.co/functions/v1/fetch-leaders';

// Function to fetch leaders
export const fetchLeaders = async (): Promise<Leader[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching leaders:', error);
    throw error;
  }
};

// Test the connection
const testConnection = async () => {
  try {
    const leaders = await fetchLeaders();
    console.log('API connection test successful:', leaders);
  } catch (error) {
    console.error('API connection test failed:', error);
  }
};

testConnection();
import axios from "axios";

const WAZUH_URL = process.env.WAZUH_URL || "https://localhost:9200";
const WAZUH_INDEX = process.env.WAZUH_INDEX || "wazuh-alerts-*";
const WAZUH_USER = process.env.WAZUH_USER || "admin";
const WAZUH_PASSWORD = process.env.WAZUH_PASSWORD || "admin";

export interface WazuhAlert {
  _id: string;
  _source: {
    agent: {
      id: string;
      name: string;
      ip: string;
    };
    manager?: {
      name: string;
    };
    rule: {
      id: string;
      level: number;
      description: string;
      groups: string[];
    };
    data?: {
      win?: Record<string, unknown>;
      sca?: Record<string, unknown>;
      file?: string;
      title?: string;
      audit?: Record<string, unknown>;
      srcuser?: string;
      dstuser?: string;
      uid?: string;
    };
    predecoder?: {
      hostname?: string;
      program_name?: string;
    };
    decoder?: {
      name: string;
      parent?: string;
    };
    full_log?: string;
    location: string;
    "@timestamp": string;
    timestamp: string;
    id: string;
  };
}

export async function fetchWazuhAlerts(
  size: number = 100
): Promise<WazuhAlert[]> {
  try {
    const response = await axios.post(
      `${WAZUH_URL}/${WAZUH_INDEX}/_search`,
      {
        size,
        sort: [{ timestamp: "desc" }],
      },
      {
        auth: {
          username: WAZUH_USER,
          password: WAZUH_PASSWORD,
        },
        httpsAgent: new (require("https").Agent)({
          rejectUnauthorized: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    return response.data.hits?.hits || [];
  } catch (error: any) {
    console.error(
      "[Wazuh] Failed to fetch alerts:",
      error.message || error
    );
    return [];
  }
}

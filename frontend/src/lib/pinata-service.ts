interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate?: boolean;
}

/**
 * Uploads a file to Pinata IPFS
 * @param file The file to upload
 * @returns Promise with the IPFS hash (CID)
 */
export async function uploadFileToPinata(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'pinata_api_key': import.meta.env.VITE_PINATA_API_KEY,
        'pinata_secret_api_key': import.meta.env.VITE_PINATA_API_SECRET,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload to Pinata: ${response.status} ${response.statusText}`);
    }

    const data: PinataResponse = await response.json();
    return data.IpfsHash;
  } catch (error) {
    console.error('Error uploading file to Pinata:', error);
    throw error;
  }
}

/**
 * Uploads JSON metadata to Pinata IPFS
 * @param json Metadata object to upload
 * @param name Filename for the metadata
 * @returns Promise with the IPFS hash (CID)
 */
export async function uploadJSONToPinata(json: object, name: string): Promise<string> {
  try {
    const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': import.meta.env.VITE_PINATA_API_KEY,
        'pinata_secret_api_key': import.meta.env.VITE_PINATA_API_SECRET,
      },
      body: JSON.stringify({
        pinataContent: json,
        pinataMetadata: {
          name: `${name}.json`,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to upload JSON to Pinata: ${response.status} ${response.statusText}`);
    }

    const data: PinataResponse = await response.json();
    return data.IpfsHash;
  } catch (error) {
    console.error('Error uploading JSON to Pinata:', error);
    throw error;
  }
}
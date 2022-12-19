import PocketBase from 'pocketbase';
import DatabaseManager from '../helpters/DatabaseManager.js';
export default async function updateFlight(flight): Promise<boolean> {
  return DatabaseManager.getInstance().updateFlight(flight);
}

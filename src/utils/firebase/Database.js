import { getDatabase, ref, set, get, orderByKey, query} from "firebase/database";
import { app, Database } from "./Firebase";
// TODO check if it inits

const insertData = (profileId, profile) => {
    const Database = getDatabase();
    const reference = ref(Database, 'profiles/' + profileId);
    set(reference, profile); // Writes dictionary into the reference (DB)
}
  
const readData = async (profileId, searchKey) => {
    const Database = getDatabase();
    searchKey = (searchKey == null) ? '' : `/${searchKey}`;
    const keyRef = ref(Database, 'profiles/' + profileId + searchKey);
    const snapshot = await get(keyRef);
    return snapshot.val();
}

const getDataByKey = async (searchKey) => {
    const Database = getDatabase();
    const keyRef = ref(Database, "profiles");

    const q = query(keyRef, orderByKey(searchKey));
    const snapshot = await get(q);
    return snapshot.val();
}

export const getMarketplaceData = async () => {
    // Needs rework as data changed
    const data = await getDataByKey('Category');
    let marketData = {};
    Object.values(data).map((item) => {
        if (marketData[item['Category']] == undefined) {
            marketData[item['Category']] = [];
        }
        marketData[item['Category']].push(item['Info'])
    })
    return marketData
}

export { readData, insertData, getDataByKey}
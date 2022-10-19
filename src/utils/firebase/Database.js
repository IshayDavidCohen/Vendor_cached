import { getDatabase, ref, set, get, query, orderByChild, equalTo} from "firebase/database";
import { app, Database } from "./Firebase";

// TODO: Fix getDatabase instance.

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

const getDataByKey = async (searchKey, value) => {
   /**
    * getDataByKey(searchKey: 'string', value: 'string') backend function that retrieves data using an indexed key in Firebase Realtime Database.
    *  Requirement: 'searchKey' variable must be included in Firebases RealTime Database Rules inside .indexOn: [].
    *  Passing a second arg will only yield results if the searchKey === value (Type included; WARNINGS for int/float to str comparison)
    * 
    * @param {searchKey} string
    * @param {value} string (Optional)
   */
    const Database = getDatabase();
    const keyRef = ref(Database, "profiles");
    
    const queryConstraints = [orderByChild(searchKey)]
    if (value !== undefined) {
        queryConstraints.push(equalTo(value))
    }

    const snapshot = await get(query(keyRef, ...queryConstraints));
    return snapshot.val();
}

const getMarketplaceData = async () => {
    // Needs rework on retrieval part
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

const getViewData = async (categoryType) => {
    /**
     * getViewData uses getDataByKey which filters by key and compares to categoryType.
     * This filters all relevant store and returns only the ones that contain the category of 'categoryType' var
     *  Requirement: 'Category' string variable must be included in Firebases RealTime Database Rules inside .indexOn: [].
     * @param {categoryType} string
   */
    const data = await getDataByKey('Category', categoryType);
    return Object.values(data).map(v => {return v.Info})
}

 
export { readData, insertData, getDataByKey, getMarketplaceData, getViewData}
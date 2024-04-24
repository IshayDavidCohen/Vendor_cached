import { getProfile, insertKey} from "../firebase/Database";

export const addItem = (storeName, item, count, userParams, setUserParams) => {
    
    // Validate input
    count = parseInt(count);

    if (item['amount'] == undefined) { item['amount'] = count }

    // Case: Store not in cart list
    if (userParams['cart'][storeName] == undefined) {
        userParams['cart'][storeName] = {[item.title]: item};
    }
    // Case: Store and item in cart list, update item amount
    else if (userParams['cart'][storeName][item.title] != undefined) {
        userParams['cart'][storeName][item.title]['amount'] = userParams['cart'][storeName][item.title]['amount'] + count;
    }
    // Case: Store exists, add new item.
    else {
        userParams['cart'][storeName][item.title] = item
    }

    setUserParams({...userParams});
}

export const SumMatrix = (matrix) => {
    return matrix.reduce((total, Arr) => {return total + Arr.reduce((accum, value) => {return accum + value} , 0)}, 0)
}

export const sendOrders = async (orders, whoOrdered, dateOrdered, hourOrdered, whereTo, Payment) => {
    // First check I am not sending myself
    for (const [storeName, orderToSend] of Object.entries(orders)) {
        let activeOrders = {};
        let orderHistory = {};

        // Add extra details to order
        let modifiedOrder = {};
        modifiedOrder['dateOrdered'] = dateOrdered;
        modifiedOrder['hourOrdered'] = hourOrdered;
        modifiedOrder['whereTo'] = whereTo;
        modifiedOrder['Payment'] = Payment;
        modifiedOrder['Content'] = orderToSend;

        const storeData = await getProfile('profiles', storeName);

        // activeOrders
        // Supplier already has activeOrders key
        if (storeData['activeOrders'] !== undefined) {

            // Get copy of activeOrders
            activeOrders = storeData['activeOrders']

            // Check if whoOrdered exists in activeOrders
            if (whoOrdered in activeOrders) {
                activeOrders[whoOrdered].push(modifiedOrder)
            }
            else {
                activeOrders[whoOrdered] = [modifiedOrder];
            }

        }
        // First-ever initialization of activeOrders
        else {
            activeOrders = {};
            activeOrders[whoOrdered] = [modifiedOrder];
        }

        // orderHistory
        // Supplier already has orderHistory key
        if (storeData['orderHistory'] !== undefined) {

            // Get copy of orderHistory
            orderHistory = storeData['orderHistory'];

            // Check if whoOrdered exists in orderHistory
            if (whoOrdered in orderHistory) {
                orderHistory[whoOrdered].push(modifiedOrder);
            }
            else {
                orderHistory[whoOrdered] = [modifiedOrder];
            }
        }
        // First-ever initialization of orderHistory
        else {
            orderHistory = {};
            orderHistory[whoOrdered] = [modifiedOrder];
        }

        // Insert new keys into Profile
        insertKey('profiles', storeName, 'activeOrders', activeOrders);
        insertKey('profiles', storeName, 'orderHistory', orderHistory);

    }

}
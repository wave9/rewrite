
/**
 *
 * @param oldList
 * @param newList
 * @param key
 */
let listDiff = function(oldList, newList, key){
    let oldMap = getKeyIndexAndFree(oldList, key);
    let newMap = getKeyIndexAndFree(newList, key);

    let newFree = newMap.free;

    let oldKeyIndex = oldMap.keyIndex;
    let newKeyIndex = newMap.keyIndex;

    // 记录所有的move操作
    let moves = [];

    // 模仿列表
    let children = [];
    let i = 0;
    let item = null;
    let itemKey = null;
    let freeIndex = 0;

    // newList向oldList的形式靠近进行操作
    while (i < oldList.length){
        item = oldList[i];
        itemKey = getItemKey(item, key);
        if(itemKey){
            if(!newKeyIndex.hasOwnProperty(itemKey)){
                children.push(null);
            }else{
                let newItemIndex = newKeyIndex[itemKey];
                children.push(newList[newItemIndex]);
            }
        }else{
            let freeItem = newFree[freeIndex++];
            children.push(freeItem || null);
        }
        i++;
    }
    let simulateList = children.slice(0);

    // 移除列表中一些不存在的元素
    i = 0;
    while( i < simulateList.length){
        if(simulateList[i] === null){
            remove(i);
            removeSimulate(i);
        }else{
            i++;
        }
    }

    let j = i = 0;
    while(i < newList.length){
        item = newList[i];
        itemKey = getItemKey(item, key);

        let simulateItem =simulateList[j];
        let simulateItemKey = getItemKey(simulateItem, key);

        if(simulateItem){
            if(itemKey === simulateItemKey){
                j ++;
            }

            else{
                //
                let nextItemKey = getItemKey(simulateList[j + 1], key);
                if(nextItemKey === itemKey){
                    remove(i);
                    removeSimulate(j);
                    j++;
                }else{
                    insert(i, item);
                }
            }
        }else{
            insert(i, item);
        }
        i ++;
    }

    let k = 0;
    while ( j++ < simulateList.length){
        remove(k+i);
        k++;
    }
    // 记录remove操作
    function remove(index) {
        let move = {
            index: index,
            type: 0
        };
        moves.push(move);
    }

    // 记录insert操作
    function insert(index, item) {
        let move = {
            index: index,
            item: item,
            type: 1
        };
        moves.push(move);
    }

    //
    function removeSimulate(index){
        simulateList.slice(index, 1);
    }

    // 返回所有操作记录
    return {
        moves: moves,
        children: children
    }
}

/**
 *
 * @param list {Array}
 * @param key {String|Function}
 */
function getKeyIndexAndFree(list, key){
    let keyIndex = {};
    let free = [];
    for(let i = 0, len = list.length ; i < len ; i++){
        let item = list[i];
        let itemKey = getItemKey(item, key);
        if(itemKey){
            keyIndex[itemKey] = i;
        }else{
            free.push(item);
        }
    }

    return {
        keyIndex: keyIndex,
        free: free
    }
}

function getItemKey(item, key){
    if(!item || !key) return void 0;
    return typeof key === "string" ? item[key] : key(item);
}

export default listDiff;
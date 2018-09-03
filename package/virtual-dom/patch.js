import _w from '../util/myunderscore';


const REPLACE = 0;  // 替换
const ATTRS = 1;    // 属性
const TEXT = 2;     // 文本内容
const REORDER = 3;  // 重排序

const walk = (node, walker, patches) => {
    let currentPatches = patches[walker.index];

    let len = node.childNodes ? node.childNodes.length : 0;

    for(let i = 0 ; i < len ; i ++){
        let child = node.childNodes[i];
        walker.index ++;
        walk(child, walker, patches);
    }

    if(currentPatches){
        dealPatches(node, currentPatches);
    }
};

export default function patch(rootNode, patches) {
    let walker = {
        index: 0
    };
    walk(rootNode, walker, patches);

};

const dealPatches = (node, currentPatches) => {
    currentPatches.forEach( currentPatch => {
        switch (currentPatch.type) {
            case REPLACE:
                let newNode = (typeof currentPatch.node === 'string')
                    ? document.createTextNode(currentPatch.node)
                    : currentPatch.node.render();
                node.parentNode.replaceChild(newNode, node);
                break;
            case REORDER:
                reorderChildren(node, currentPatch.moves);
                break;
            case ATTRS:
                setAttrs(node, currentPatch.props);
                break;
            case TEXT:
                if (node.textContent) {
                    node.textContent = currentPatch.content;
                } else {
                    // for ie
                    node.nodeValue = currentPatch.content;
                }
                break;
            default:
                throw new Error('Unknown patch type ' + currentPatch.type);
        }
    } )
};

// 给节点添加属性
function setAttrs (node, props) {
    for (let key in props) {
        if(props.hasOwnProperty(key)){
            if (props[key] === void 0) {
                node.removeAttribute(key);
            } else {
                let value = props[key];
                _w.setAttr(node, key, value)
            }
        }
    }
}

// 重新排列子元素
function reorderChildren (node, moves) {
    let staticNodeList = _w.toArray(node.childNodes);
    let maps = {}; // 存储含有key特殊字段的节点

    staticNodeList.forEach(node => {
        // 如果当前节点是ElementNode，通过maps将含有key字段的节点进行存储
        if (_w.isElementNode(node)) {
            let key = node.getAttribute('key');
            if (key) {
                maps[key] = node
            }
        }
    });

    moves.forEach(move => {
        let index = move.index;
        if (move.type === REPLACE) { // remove item
            if (staticNodeList[index] === node.childNodes[index]) { // maybe have been removed for inserting
                node.removeChild(node.childNodes[index])
            }
            staticNodeList.splice(index, 1)
        } else if (move.type === 1) { // insert item
            let insertNode = maps[move.item.key]
                ? maps[move.item.key] // reuse old item
                : (typeof move.item === 'object')
                    ? move.item.render()
                    : document.createTextNode(move.item);
            staticNodeList.splice(index, 0, insertNode);
            node.insertBefore(insertNode, node.childNodes[index] || null)
        }
    })
}
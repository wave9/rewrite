import _w from '../util/myunderscore';
import listDiff from './list-diff';

// 这里用于比较两颗dom树的差异
const REPLACE = 0;  // 替换
const ATTRS = 1;    // 属性
const TEXT = 2;     // 文本内容
const REORDER = 3;  // 重排序

/**
 * 比较两棵树的差异
 * @param oldTree 旧树
 * @param newTree 新树
 */
export default function diff(oldTree, newTree) {
    let index = 0;
    let patches = {};  // 这里用来记录差异
    dfsWalk(oldTree, newTree, index, patches);  // 深度遍历查找节点
    return patches;
}

/**
 *
 * @param oldNode
 * @param newNode
 * @param index
 * @param patches
 */
function dfsWalk(oldNode, newNode, index, patches) {
    let currentPatch = [];  // currentPatch 用于记录每一次遍历之后的区别

    // 如果oldNode被remove了
    if(newNode === null || newNode === undefined) { }

    // 这里判断文本节点的差异
    else if (_w.isString(oldNode) && _w.isString(newNode)){
        if(newNode !== oldNode){
            currentPatch.push({
                type: TEXT,
                content: newNode
            })
        }
    }

    // 比较属性间的不同，这里是对 标签相同而且有着相同key值 的节点进行判断
    else if(oldNode.tagName === newNode.tagName && oldNode.key === newNode.key){
        let attrPatches = diffAttrs(oldNode, newNode);
        if(attrPatches){
            currentPatch.push({
                type: ATTRS,
                attrs: attrPatches
            })
        }

        // 如果有着相同的父级，那么就可以递归进行子节点的diff比较
        diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
    }

    else{
        currentPatch.push({
            type: REPLACE,
            node: newNode
        })
    }

    if(currentPatch.length){
        patches[index] = currentPatch;
    }
}

/**
 * 这里用于比较属性间的不同
 * @param oldNode
 * @param newNode
 */
const diffAttrs = function (oldNode, newNode) {
    let count = 0;
    let oldAttrs = oldNode.attrs;
    let newAttrs = newNode.attrs;

    let key, value;
    let attrsPatches = {};

    // 如果存在不同的属性，也即新节点中相同属性的 value 与 旧节点中属性值的value 不同，那么我们就可以将这个区别记录下来，放到我们的 attrPatches中
    for(key in oldAttrs){
        if(oldAttrs.hasOwnProperty(key)){
            value = oldAttrs[key];

            if(newAttrs[key] !== value){
                count ++;
                attrsPatches[key] = newAttrs[key];
            }
        }
    }

    // 如果存在新的属性，也就是新节点中出现了旧节点中所没有的属性，那么我们也把他记录下来，放到我们的 attrPatches中
    for(key in newAttrs){
        if(newAttrs.hasOwnProperty(key)){
            value = newAttrs[key];
            if( !oldAttrs.hasOwnProperty(key)){
                count ++;
                attrsPatches[key] = value;
            }
        }
    }

    // 什么都没有，返回null
    if(count === 0){
        return null;
    }

    return attrsPatches;

};

let key_id = 0;
/**
 * 遍历子节点
 * @param oldChildren
 * @param newChildren
 * @param index
 * @param patches
 * @param currentPatch
 */
function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
    let diffs = listDiff(oldChildren, newChildren, 'key');
    newChildren = diffs.children;

    if(diffs.moves.length){
        let reorderPatch = {
            type: REORDER,
            moves: diffs.moves
        };
        currentPatch.push(reorderPatch);
    }

    let leftNode = null;
    // 存放当前node的标识，初始化值为0
    let currentNodeIndex = index;
    oldChildren.forEach((child, i) => {
        key_id ++;
        let newChild = newChildren[i];
        currentNodeIndex = key_id;

        // 递归继续比较
        dfsWalk(child, newChild, currentNodeIndex, patches);
    })
}
export default class Element {
    constructor(tagName, attrs, children) {
        this.tagName = tagName;
        this.attrs = attrs;
        this.children = children;

        this.render = this.render.bind(this);
    }

    /**
     * 由json渲染出DOM结构
     */
    render(){
        let { tagName, attrs, children } = this,
            el = document.createElement(tagName);

        // 给添加添加属性
        for(let propsName in attrs){
            if(attrs.hasOwnProperty(propsName)){
                el.setAttribute(propsName, attrs[propsName]);
            }
        }

        // 添加子节点
        children.map( elt => {
           let childTemp = (
               (elt instanceof Element)
                   ? elt.render()
                   : document.createTextNode(elt)
           );
           el.appendChild(childTemp);
        });

        return el;
    }
}
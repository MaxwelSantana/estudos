function dragStart(event) {
    event.dataTransfer.setData("Text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(el, event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    var ev = document.getElementById(data);
    if(ev)
        fillDays(el, ev);
}

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}
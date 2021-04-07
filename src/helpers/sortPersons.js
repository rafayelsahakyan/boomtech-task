export default function dynamicSort(property,order) {
    var sort_order = 1;
    if(order === "desc"){
        sort_order = -1;
    }
    return function (a, b){
        if(a[property] < b[property]){
                return -1 * sort_order;
        }else if(a[property] > b[property]){
                return 1 * sort_order;
        }else{
                return 0 * sort_order;
        }
    }
}
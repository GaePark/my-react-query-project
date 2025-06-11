export interface PageData {
    curpage:number;
    totalpage:number;
    startPage:number;
    endPage:number;
    type:string;
}
export interface Recipe {
    title: string;
    likecount: number;
    hit: number;
    poster: string;
    no: number;
    chef: string;
    num: number;
}
export interface RecipeListData{
    list:Recipe[];
    curpage:number;
    totalpage:number;
    startPage:number;
    endPage:number;
}
export interface Food{
    name: string;
    type: string;
    fno: number;
    phone: string;
    poster: string;
    num: number;
    likecount:number;
    hit:number;
}

export interface FoodListData{
    list:Food[];
    curpage:number;
    totalpage:number;
    startPage:number;
    endPage:number;
}

export interface Board{
    no:number;
    name:string;
    subject:string;
    content:string;
    dbday:string;
    hit:number;
    id:string;
}
export interface BoardListData{
    list:Board[];
    totalpage:number;
}

export interface FoodDetailData {
    fno:number;
    hit:number;
    jjimcount:number;
    likecount:number;
    replycount:number;
    score:number;
    name:string;
    type:string;
    phone:string;
    address:string;
    theme:string;
    poster:string;
    images:string;
    time:string;
    parking:string;
    content:string;
    price:string;
    rdays:string;
}

interface RecipeDetailData{
    no:number;
    poster:string;
    likecount:number;
    title:string;
    chef:string;
    chef_poster:string;
    chef_profile:string;
    info1:string;
    info2:string;
    info3:string;
    content:string;
    foodmake:string;
    data:string;
}

export interface RecipeDetailResponse{
    vo:RecipeDetailData;
    mList:[];
    iList:[];
    dList:[];
}

export interface RecipeFindData{
    NO:number;
    POSTER:string;
    TITLE:string;
    CHEF:string;
    HIT:number;
    LIKECOUNT:number;
    NUM:number;
}

export interface FoodFindData{
    FNO:number;
    POSTER:string;
    NAME:string;
    ADDRESS:string;
    LIKECOUNT:number;
    HIT:number;
    NUM:number;
}


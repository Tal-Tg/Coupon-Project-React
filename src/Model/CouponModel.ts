import companyModel from "./AdminModels/CompanyModel";

class CouponModel{
    id?:number;
    name?:string
    categoryId?: number;
    description?:string;
    image?:string;
}

export default CouponModel;
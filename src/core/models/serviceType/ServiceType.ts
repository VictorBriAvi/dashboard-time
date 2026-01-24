export interface ServiceType {
  id: number;
  name: string;
  price: number;
  serviceCategorieName: string;
  serviceCategorieId: number;
}

export interface CreateServiceType {
  name: string,
  price: number,
  serviceCategorieId: number
} 


export interface EditServiceType {
  id: number;
  name: string;
  price: number;
  serviceCategorieId: number;

}
import { Medicine } from '../models/medicine.model';

export interface IMedicineService {
    getAll(): Promise<Medicine[]>;
}

import { Medicine } from '../models/medicine.model';

export interface IMedicineService {
    getAll(): Promise<Medicine[]>;
    delete(id: number): Promise<Medicine>;
    save(medicine: Medicine): Promise<Medicine>;
}

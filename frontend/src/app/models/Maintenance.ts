// import {Customer} from './Customer'

export class maintenance {
    created_at: string = Date.now().toLocaleString();
    created_by: {name:string, user_id:string};
    image: string;
    maintenance_id: string;
    title: string;
}

export class CreateMaintenanceRequest {
    created_at: string;
    created_by: {name:string, user_id:string};
    room_name: string;
    photo: File;
    cost: number;
    title: string;
}

export class EditMaintenanceRequest {
    created_at: string;
    created_by: {name:string, user_id:string};
    room_name: string;
    photo: File;
    cost: number;
    title: string;
}

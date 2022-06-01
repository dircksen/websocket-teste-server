export class Connection {
    private _course_class_id: string;
    private _course_id: string;
    private _socket_id: string;
    private _user_id: string;
    
    
    constructor (courseClassId:string, socketId:string, courseId:string, userId:string) {
        this._course_class_id = courseClassId;
        this._socket_id = socketId;
        this._course_id = courseId;
        this._user_id = userId;
    }
    
    
    public get course_id(): string {
        return this._course_id;
    }
    public set course_id(value: string) {
        this._course_id = value;
    }
    public get user_id(): string {
        return this._user_id;
    }
    public set user_id(value: string) {
        this._user_id = value;
    }
    public get socket_id(): string {
        return this._socket_id;
    }
    public set socket_id(value: string) {
        this._socket_id = value;
    }
    public get course_class_id(): string {
        return this._course_class_id;
    }
    public set course_class_id(value: string) {
        this._course_class_id = value;
    }

}
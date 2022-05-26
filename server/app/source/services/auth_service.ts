export default class AuthenticationService {
    
    public authUser(token: any){
        //decode token?
        if(!token.course_id)
            return false;
        if(!token.user_id)
            return false;
        if(!token.course_class_id)
            return false;
            
        return true;
    }
}
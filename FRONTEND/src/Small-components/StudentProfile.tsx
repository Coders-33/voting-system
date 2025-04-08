import styles from  "../Styling/StudentProfile.module.css";
import profileImage from "../images/avatars/8.png";
import { useAuthContext } from '../Context/UserContext';
interface ProfiePayloadProps {
    toogleView : (toogleValue  : boolean) => void ;
}

function StudentProfile({toogleView} : ProfiePayloadProps)  {
  
  const { user } = useAuthContext();
    return (
  <>
  
  <div className={styles.bigContainer} ></div>
     <div className={styles.studentProfileBox} >
     <img src={profileImage} 
     style={{ width : "120px" , height : "120px" , objectFit : "contain" }}
     alt="" />
     <div style={{ display : "flex" , gap : '20px',
      alignItems  : "center" , justifyContent : "center",
      flexDirection : "column" }} >
      <span>Hi , {user?.studentName} </span>
       <div>
       <span>Email : {user?.email}</span> 
       </div>
       <button onClick={() => toogleView(false)} >Back</button>
     </div>
  </div>
  </>
  )
}

export default StudentProfile


import './Tables.css';


function Stats(input) {
  
  const stats = input.input;
  return (
    
     <div>
     {stats && 
         <table className="table">
           <thead>
             <tr>
               <th>Bucket Status</th>
               <th>Number of Users</th>
               <th>Number of Assets</th>
             </tr>
           </thead>
           <tbody>
                  <tr >
                     <td>{stats.message}</td>
                     <td>{stats.db_numUsers}</td>
                     <td>{stats.db_numAssets}</td>
                 </tr>
           </tbody>
         </table>
      }

    </div>
  );
}

export default Stats;

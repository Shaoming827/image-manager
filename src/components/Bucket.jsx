
const Bucket = (input) => {
  const buckets = input.input && input.input.data;
  return (
    <div className='table-container'>
          
          {buckets && 
              <table className="table">
                <thead>
                  <tr>
                    <th>Bucket key</th>
                    <th>Last Modified</th>
                    <th>Size</th>
                   
                    
                  </tr>
                </thead>
                <tbody>
                  {buckets.map((bucket, index) => (
                      <tr key={index}>
                        <td>{bucket.Key}</td>
                          <td>{bucket.LastModified}</td>
                          <td>{bucket.Size}</td>

                          
                      </tr>
                    ))}
                </tbody>
              </table>
    }

    </div>
   
  );
};

export default Bucket;


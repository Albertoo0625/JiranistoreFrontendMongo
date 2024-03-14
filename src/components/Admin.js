import { Link } from "react-router-dom";
import AdminColumns from "./AdminColumns";
import AdminList from "./AdminList";
import { ProductConsumer } from '../context';
import AdminEmpty from "./AdminEmpty";

const Admin = () => {
  return (
    <section className="col-12">
      <ProductConsumer>
        {(value) => {
          const { pendingProduct } = value;
          console.log(pendingProduct);
          if (pendingProduct.length>0) {
            return (
              <>
                <section className="col-12" style={{color:"white"}}>
                  <h1>Admins Page</h1>
                  <br />
                  <AdminColumns />
                  <AdminList value={value} />
                  <br />
                  <div>
                  <Link to="/home">Home</Link>
                  </div>
                </section>
              </>
            )
          } else 
            return (
              <>              
                  <AdminEmpty />
              </>
            )
          }
        }
      </ProductConsumer>
    </section>
  )
}

export default Admin;

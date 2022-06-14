import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="columns m-2 is-centered has-text-centered">
        <div className="box m-2 mt-3 column is-3 has-background-primary">
          <div className="is-primary p-5 has-text-white	">
            <div className="is-size-2">Quiz App</div>
            <div className="is-size-5">Modern Quiz App</div>
          </div>
        </div>
        <div className="column is-7">
          <div className="box">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            numquam placeat temporibus ratione? Repellendus adipisci tempore ab
            repudiandae quae praesentium sequi nisi numquam, obcaecati similique
            sapiente non optio deleniti maxime.
          </div>

          <div className="box">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            numquam placeat temporibus ratione? Repellendus adipisci tempore ab
            repudiandae quae praesentium sequi nisi numquam, obcaecati similique
            sapiente non optio deleniti maxime.
          </div>

          <div className="box has-text-white">
            <Link to="/register">
              <div className="button is-primary m-2">
                <p className="has-text-white">Sign up</p>
              </div>
            </Link>
            <Link to="/login">
              <div className="button is-primary m-2">
                <p className="has-text-white">Login</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

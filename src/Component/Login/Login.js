import React from "react";
import { Button } from "antd";
import { auth, provider } from "../../firebase/util";
import { useStateValue } from "../../redux/StateProvider";
import { actionTypes } from "../../redux/reducer";
const Login = () => {
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  const signin = (e) => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        dispatch({
          type: actionTypes.SET_USER,
          payload: res.user,
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="login">
      <div className="login__container ">
        <img
          src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
          alt=""
          className="img-fluid login__image"
        />
        <h3 className="mt-4">Sign in to Slack</h3>
        <Button onClick={signin} type="primary">
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;

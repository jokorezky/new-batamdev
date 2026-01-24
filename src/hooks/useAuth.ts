import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/authSlice";
import { RootState } from "@/redux/store";

export const useAuth = () => {
  const dispatch = useDispatch();

  const token = Cookies.get("token");
  const hasToken = !!token;

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (hasToken) {
      dispatch(login());
    }
  }, [dispatch, hasToken]);

  return hasToken || isAuthenticated;
};

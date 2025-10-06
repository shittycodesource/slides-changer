import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";


export default {

    state: {},

    mutations: {},

    actions: {

        /**
         * @param data Email and Password
         * return true if auth is succeed, false if not
         */
        async auth({}, data) {
            try {
                const response = await signInWithEmailAndPassword(auth, data.email, data.password)

                if (response.user.uid) {
                    return true;
                }

                return false;
            } catch(error) {
                console.log("auth error: ", error);
                throw error;
            }
        }

    },
    
    getters: {
        getCurrentUser: (state) => auth.currentUser
    }
}
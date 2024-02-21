import { magicAdmin } from "../../lib/magic"
import jwt from "jsonwebtoken"

export default async function login(req, res) {
    if (req.method === "POST") {
        try {
            const auth = req.headers.authorization;
            const didToken = auth ? auth.substr(7) : ""

            const metaData = await magicAdmin.users.getMetaDataByToken(didToken)

            const token = jwt.sign({
                ...metaData,
                "iat": Math.floor(Date.now() / 1000),
                "exp": Math.floor(Date.now() / 1000 + 7*24*60* 60),
                "https://hasura.io/jwt/claims": {
                    "x-hasura-default-role": "user",
                    "x-hasura-allowed-roles": ["user", "admin"],
                    "x-hasura-custom": `${metaData.issuer}`
                }
              },
            // add secret
            )
            res.send({});
        } catch (error) {
            console.error("Something went wrong logging in ", error)
            res.status(500).send({})
        }
    } else {

    }
}
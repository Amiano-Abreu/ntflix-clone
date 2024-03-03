import { findVideoIdByUser, insertStats, updateStats } from "@/lib/db/hasura";
import jwt from "jsonwebtoken"

export default async function stats(req, res) {
    if (req.method === "POST") {

        try {
            const token = req.cookies.token
            if (!token) {
                res.status(403).send({})
            } else {
                const { videoId, favourited, watched = true } = req.body
                
                if (videoId) {
                    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
                
                    const userId = decodedToken.issuer;

                    const doesStatsExist = await findVideoIdByUser(token, userId, videoId);
                    
                    if (doesStatsExist) {
                        const response = await updateStats(token, {
                            watched,
                            userId,
                            videoId,
                            favourited
                        });

                        res.send({ data: response })
                    } else {
                        const response = await insertStats(token, {
                            watched,
                            userId,
                            videoId,
                            favourited
                        });

                        res.send({ data: response })
                    }
                }
                
            }
        } catch (error) {
            console.error("Error occurred /stats", error)
            res.status(500).send({
                done: false,
                error: error?.message
            })
        } 
    }
}
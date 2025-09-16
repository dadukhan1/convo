import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetFunction = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Rate limit exceeded. Please try again later." });
            }

            else if (decision.reason.isBot()) {
                return res.json(403).json({ message: "Bot Access Denied." });
            } else {
                return res.json(403).json({ message: "Access Denied by security policy." });

            }
        }

        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({
                error: "Spoofed bot detected",
                message: "Malicious bot activity detected.",
            });
        }


    } catch (error) {
        console.log("Arcject Protection Error: ", error);
        next();
    }
}
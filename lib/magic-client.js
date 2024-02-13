const { Magic } = require("magic-sdk")

const createMagic = () => {
    return (
        typeof window !== "undefined" && 
        new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABALE_API_KEY)
    );
}

export const magic = createMagic()

console.log({magic})
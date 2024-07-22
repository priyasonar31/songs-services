
export const verifyOrigin = (req, res, next) => {
    const origin = req.get('Origin');
    console.log("Requested Origin---->", origin);
    if (origin && origin === process.env.ALLOWED_ORIGIN) {
        console.log("Allowed-->", origin);
        next();
    } else {
        console.log("Invalid Origin-->", origin);
        res.status(403).json({ message: 'Forbidden: Invalid Origin' });
    }
}


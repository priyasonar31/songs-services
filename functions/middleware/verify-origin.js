
export const verifyOrigin = (req, res, next) => {
    const origin = req.get('Origin');

    if (origin && origin === process.env.ALLOWED_ORIGIN) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Invalid Origin' });
    }
}


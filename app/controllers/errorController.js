//~Errors management
function _404(req, res) {
    res.status(404).json({ "Error 404": 'Page Not Found'});
};
function _500(err, req, res) { res.status(500).json({"Server Error 500": err.message});
};

export { _404, _500 };
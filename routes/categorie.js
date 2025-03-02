const router = require("express").Router();
const Categorie = require('../models/Category');
// afficher la liste des categories.
router.get('/getcategories', async (req, res,) => {
    try {
        const cat = await Categorie.find();
        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});
// créer un nouvelle catégorie
router.post('/addCategory', async (req, res) => {
    const { name, image } = req.body;
    const newCategorie = new Categorie({
        name: name,
        image: image
    })
    try {
        await newCategorie.save();
        res.status(200).json(newCategorie);
    } catch (error) {

        res.status(404).json({ message: error.message });
    }
});
// chercher une catégorie
router.get('/:categorieId', async (req, res) => {
    try {
        const cat = await Categorie.findById(req.params.categorieId);

        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// modifier une catégorie
router.put('/updatecategory/:categorieId', async (req, res) => {

    const { name, image } = req.body;
    const id = req.params.categorieId;
    try {
        const cat1 = {
            name:name, image: image, _id: id
        };
        console.log(cat1)
        await Categorie.findByIdAndUpdate(id, cat1);
        res.json(cat1);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// Supprimer une catégorie
router.delete('/deletecategory/:categorieId', async (req, res) => {
    const id = req.params.categorieId;
    await Categorie.findByIdAndDelete(id);
    res.json({ message: "categorie deleted successfully." });
});
module.exports = router;
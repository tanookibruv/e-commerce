const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catData = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catData = await Category.findByPk(
      req.params.id,
        { include: [Product] }
    );
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newcatData = await Category.create({
      catergory_name: req.body.category_name
    });
    res.status(200).json(newcatData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCat = await Catergory.update(
      {
        category_name: req.body.category_name
      },
      {
        where: { 
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updateCat)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteData = await Category.destroy(
      {
      where: {
        id: req.params.id,
      },
    });
    if (!deleteData) {
      res.status(404).json({ message: 'This id does not belong to any Category.'})
      return;
    }
    res.status(200).json(deleteData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;

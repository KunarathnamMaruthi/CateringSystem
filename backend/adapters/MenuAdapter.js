class MenuAdapter {

  static adapt(menu) {

    return {

      id: menu._id,

      title: menu.title,

      category: menu.category,

      description: menu.description,

      price: menu.price,

      image:
        `http://localhost:5000/uploads/${menu.image}`,

      createdAt:
        menu.createdAt,
    };
  }

  static adaptMany(menus) {

    return menus.map(
      menu =>
        this.adapt(menu)
    );
  }
}

module.exports =
  MenuAdapter;
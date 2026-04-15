const piece = {
  name: 'piece',
  title: 'Piece',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: '2D Engraving', value: '2d' },
          { title: '3D Piece', value: '3d' },
        ],
        layout: 'radio',
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'material',
      title: 'Material',
      type: 'string',
      description: 'e.g. Mild steel, Copper, Brass',
    },
    {
      name: 'price',
      title: 'Price (€)',
      type: 'number',
    },
    {
      name: 'available',
      title: 'Available for Purchase',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'category',
    },
  },
}

export default piece

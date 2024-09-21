import { defineField, defineType } from "sanity"

export const items = defineType(
    {
        name: 'items',
        title: 'Items',
        type: 'document',
        fields:[defineField({
                name: 'title',
                title: 'Title',
                type: 'string',
              }),
              defineField({
                name: 'description',
                title: 'Description',
                type: 'string',
              }),
              defineField({
                name: 'resourceLink',
                title: 'Resource Link',
                type: 'string',
              }),
              defineField({
                name: 'imgUrl',
                title: 'ImageUrl',
                type: 'image',
                options: {
                  hotspot: true,
                },
              }),
              defineField({
                name: 'tags',
                title: 'Tags',
               type:'array',
               of: [
                 {
                   name:'tag',
                   title:'Tag',
                   type:'string'
                 }
               ]
              }),
        ]
    }
)
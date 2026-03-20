# Gabriel Read Me

---
## 1.Describe how you would add an editable text setting to a section using schema, and render it in Liquid. Include both the schema and Liquid example.
## Answer

When working with Shopify sections, the schema is where you define what kind of input a merchant can edit, and the type you choose really depends on how that content is meant to be used on the page. To add an editable text setting in a Shopify section, you define it inside the schema block, which controls what the merchant can edit in the theme editor. Shopify provides different input types depending on the need—text for short content like headings, textarea for longer plain text, and richtext for formatted content with links or styling. Each setting is given an id, and that id is what connects the schema to the Liquid markup.

Once the setting is created, you render it in the Liquid code above the schema using section.settings.<id>. This allows whatever the merchant enters in the editor to appear dynamically on the storefront. It’s best practice to check that the value is not blank before rendering to avoid empty elements, and to use filters like escape for plain text fields. For richtext, you can output it directly since Shopify already sanitizes it.

Here’s an example showing both the Liquid and schema:
```liquid
<div class="custom-section page-width">
  {% if section.settings.heading != blank %}
    <h2>{{ section.settings.heading | escape }}</h2>
  {% endif %}

  {% if section.settings.description != blank %}
    <div>{{ section.settings.description }}</div>
  {% endif %}
</div>

{% schema %}
{
  "name": "Custom text section",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Welcome to our store"
    },
    {
      "type": "richtext",
      "id": "description",
      "label": "Description",
      "default": "<p>Add your description here</p>"
    }
  ],
  "presets": [
    {
      "name": "Custom text section"
    }
  ]
}
{% endschema %}
```


---

## 2. How would you implement a collection banner using the collection’s featured image in a section that can be reused across templates?
## Answer

To implement a reusable collection banner in Shopify, I would create a section that pulls data from the current collection object, especially collection.image for the featured image and collection.title for the heading. This works well when the section is added to a collection template, because that is where the collection object is available. To make it reusable across different collection templates, I would keep the section dynamic and add schema settings for layout controls such as banner height, text alignment, overlay opacity, and whether to show the collection description.

For the actual banner content, the section can use the collection’s featured image as the default visual, but a metafield can also be used when more customization is needed. For example, a merchant might want a separate desktop banner image, mobile banner image, custom heading, or subtext that is different from the default collection title and description. In that case, the section can first check whether a collection metafield exists, and if it does, use that value instead of the standard collection image or text. This gives more flexibility while still keeping the section tied to the collection and reusable across templates.

In Liquid, the logic would usually follow a fallback structure: first check for a custom metafield image, then fall back to collection.image, and finally show nothing or a placeholder if neither exists. The same idea can be used for text, where a metafield heading or subtitle can override the default collection title or description. This approach makes the section more scalable, because it works out of the box with the collection’s built-in data, but also supports metafields for stores that need more tailored collection banner content without creating separate hardcoded sections for every template.



---



## 3. In a Shopify section, add a setting that allows a merchant to toggle the visibility of a component (e.g., show/hide a banner). Show both the schema and the Liquid needed to implement this.
## Answer

To let a merchant show or hide a component in a Shopify section, I would add a checkbox setting in the schema. A checkbox is the most practical choice for this because it gives a simple true-or-false control in the theme editor. For example, if the component is a banner, the merchant can turn the checkbox on to display it or off to hide it, without needing to edit any code. This makes the section more flexible and easier to manage across different pages or templates.

In the Liquid markup, the checkbox value is accessed through section.settings.<id>. Since a checkbox returns a boolean value, you can wrap the component in an {% if %} statement and only render it when the setting is enabled. This keeps the markup clean and prevents hidden components from outputting empty HTML on the storefront. It is a common pattern in Shopify sections because it gives merchants quick control over optional content.

Here is an example showing both the Liquid and the schema:

```liquid
{% if section.settings.show_banner %}
  <div class="custom-banner">
    <h2>{{ section.settings.banner_heading | escape }}</h2>
    <p>{{ section.settings.banner_text | escape }}</p>
  </div>
{% endif %}

{% schema %}
{
  "name": "Toggle banner section",
  "settings": [
    {
      "type": "checkbox",
      "id": "show_banner",
      "label": "Show banner",
      "default": true
    },
    {
      "type": "text",
      "id": "banner_heading",
      "label": "Banner heading",
      "default": "Welcome to our dev store"
    },
    {
      "type": "text",
      "id": "banner_text",
      "label": "Banner text",
      "default": "Add your banner message here"
    }
  ],
  "presets": [
    {
      "name": "Toggle banner section"
    }
  ]
}
{% endschema %}
```

---

## 4. In a Shopify section, how would you access and render the current product’s title, price, and featured image? Briefly explain the context required for this to work.
## Answer

In a Shopify section, you can access the current product’s data using the product object, which is automatically available when the section is used within a product template (such as product.json or main-product.liquid). This context is important because outside of a product page, the product object will not exist unless it is explicitly passed in. So for this to work correctly, the section must either be included in a product template or designed specifically for product pages.

In the Liquid markup, you can render the product’s title, price, and featured image using built-in properties of the product object. The title is accessed with product.title, the price with product.price (usually formatted using a money filter), and the featured image with product.featured_image. It’s also good practice to check that the product exists before rendering to avoid errors.This works because Shopify automatically injects the product object into sections rendered on product pages, allowing you to dynamically display product-specific data without hardcoding anything.

Here’s a simple example:

```liquid
{% if product %}
  <div class="product-card">
    <h2>{{ product.title }}</h2>

    <p>{{ product.price | money }}</p>

    {% if product.featured_image %}
      <img 
        src="{{ product.featured_image | image_url: width: 600 }}" 
        alt="{{ product.title | escape }}"
      >
    {% endif %}
  </div>
{% endif %}
```


---

## 5. Using section schema, define a repeatable block (e.g., items with a title and text). Show how you would loop through and render those blocks in Liquid.
## Answers

To create repeatable content in a Shopify section, I would use blocks inside the section schema. Blocks are useful when a merchant needs to add multiple items of the same structure, such as FAQs, feature points, steps, or testimonials. Instead of hardcoding each item, Shopify lets the merchant add, remove, and reorder blocks directly in the theme editor, which makes the section much more flexible and reusable.

Each block can have its own settings, such as a title and a text field. In the Liquid markup, you loop through them using section.blocks, then access each block’s settings with block.settings.<id>. This allows every block to render its own unique content while still following the same layout. It’s also a good idea to check if values are not blank before outputting them, so the section stays clean.

Here’s an example:


```liquid
<div class="custom-items">
  {% for block in section.blocks %}
    <div class="custom-item" {{ block.shopify_attributes }}>
      {% if block.settings.title != blank %}
        <h3>{{ block.settings.title | escape }}</h3>
      {% endif %}

      {% if block.settings.text != blank %}
        <p>{{ block.settings.text | escape }}</p>
      {% endif %}
    </div>
  {% endfor %}
</div>

{% schema %}
{
  "name": "Repeatable items section",
  "blocks": [
    {
      "type": "item",
      "name": "Item",
      "settings": [
        {
          "type": "text",
          "id": "title",
          "label": "Title",
          "default": "Item title"
        },
        {
          "type": "textarea",
          "id": "text",
          "label": "Text",
          "default": "Add item text here"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Repeatable items section",
      "blocks": [
        {
          "type": "item"
        },
        {
          "type": "item"
        }
      ]
    }
  ]
}
{% endschema %}
```

---
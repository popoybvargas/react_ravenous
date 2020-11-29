const apiKey = 'NgZF0Otfeb5HIIV3Obm9KT4wHs78mey8iFIozNCund8UyetEUBxQIYvZBYI4-Ti25l45HrPZL5AeuAbWUkrkwNUL5m1KCnv8_TYTDEM51xoQ25wf0e0DkSSpr1bDX3Yx';

const Yelp =
{
  search(term, location, sortBy)
  {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
    {
      headers:
      {
        Authorization: `Bearer ${apiKey}`
      }
    })
    .then(response => response.json())
    .then(jsonResponse =>
    {
      if (jsonResponse.businesses)
      {
        return jsonResponse.businesses.map(business =>
        {
          // const address = business.location.display_address.join("\n");
          let address = business.location.address1;
          address += business.location.address2 ? `\n${business.location.address2}` : '';
          address += business.location.address3 ? `\n${business.location.address3}` : '';

          const categories = [];
          business.categories.forEach(category => categories.push(category.title));

          return {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: categories.join(', '),
            rating: business.rating,
            reviewCount: business.review_count
          };
        });
      }
    });
  }
};

export default Yelp;
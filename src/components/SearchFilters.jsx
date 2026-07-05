export default function SearchFilters({
  cities,
  filters,
  onFilterChange,
  onReset,
  filteredCount,
  totalCount,
}) {
  return (
    <section className="filter-panel" id="filters" aria-label="Search and filter hotels">
      <div className="filter-heading">
        <div>
          <p className="eyebrow">Explore hotels</p>
          <h2>Search your stay</h2>
        </div>
        <p>
          Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> hotels
        </p>
      </div>

      <div className="filter-grid">
        <label>
          Search
          <input
            type="search"
            value={filters.query}
            placeholder="Hotel name or city"
            onChange={(event) => onFilterChange('query', event.target.value)}
          />
        </label>

        <label>
          City
          <select value={filters.city} onChange={(event) => onFilterChange('city', event.target.value)}>
            <option value="all">All cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <label>
          Minimum rating
          <select value={filters.rating} onChange={(event) => onFilterChange('rating', event.target.value)}>
            <option value="0">Any rating</option>
            <option value="3">3.0+</option>
            <option value="4">4.0+</option>
            <option value="4.5">4.5+</option>
          </select>
        </label>

        <label>
          Max price
          <select value={filters.maxPrice} onChange={(event) => onFilterChange('maxPrice', event.target.value)}>
            <option value="all">Any price</option>
            <option value="3000">Under Rs. 3,000</option>
            <option value="5000">Under Rs. 5,000</option>
            <option value="8000">Under Rs. 8,000</option>
            <option value="10000">Under Rs. 10,000</option>
          </select>
        </label>

        <label>
          Sort by
          <select value={filters.sortBy} onChange={(event) => onFilterChange('sortBy', event.target.value)}>
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="rating-high">Rating: high to low</option>
          </select>
        </label>

        <button className="secondary-button" type="button" onClick={onReset}>
          Clear filters
        </button>
      </div>
    </section>
  );
}

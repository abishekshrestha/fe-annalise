import React, { SyntheticEvent } from "react";

interface IProps {
  name: string;
  search: string;
  imageList: any;
  loading: boolean;
  isValid: boolean;
  totalPages: number;
  page: number;
  handleSubmit?: (e: SyntheticEvent) => void;
  onPaginationClick?: () => void;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({
  name = "",
  search = "",
  imageList = [],
  loading = false,
  isValid = true,
  totalPages = 0,
  page,
  handleSubmit,
  onPaginationClick,
  onInputChange,
}: IProps) => (
  <React.Fragment>
    <header className="header">
      <div className="container">
        <div className="row">
          <h1 className="col-12" id="name">
            Hello, {name}
          </h1>
        </div>
      </div>
    </header>
    <div className="container image-list">
      <div className="row">
        <div className="col-12">
          <form
            className="search-group"
            data-testid="search-form"
            onSubmit={handleSubmit}
          >
            <label htmlFor="search" hidden>
              Search
            </label>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              value={search}
              onChange={onInputChange}
              data-testid="inputbox"
            />
            <button type="submit">Search</button>
          </form>
          {!isValid && <div className="error">Please enter valid keyword</div>}
        </div>
      </div>

      {imageList.length > 0 && (
        <React.Fragment>
          <div className="row" data-testid="image-list">
            {imageList?.map((item: {}, index: number) => (
              // TODO: imageList and item type needs to be defined clearly
              //@ts-ignore
              <div className="col-4 col-12-sm" key={`${item?.id}-${index}`}>
                {
                  //@ts-ignore
                  <img className="img-fluid" src={item.urls?.regular} />
                }
              </div>
            ))}
          </div>
          {!loading && page < totalPages && (
            <div className="center load-more-wrapper">
              <button data-testid="load-more" onClick={onPaginationClick}>
                Load more
              </button>
            </div>
          )}
        </React.Fragment>
      )}
      {loading && <p className="center">Loading...</p>}
    </div>
  </React.Fragment>
);

export default Search;

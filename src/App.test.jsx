import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
  import userEvent from "@testing-library/user-event";
// Mock property data
const mockProperties = [
  {
    id: "prop1",
    type: "House",
    bedrooms: 3,
    price: 750000,
    shortDescription: "Test House 1",
    location: "London",
    images: ["house1.jpg"],
    added: { day: 1, month: "Jan", year: 2025 },
    url: "/properties/prop1.html",
  },
  {
    id: "prop2",
    type: "Flat",
    bedrooms: 2,
    price: 500000,
    shortDescription: "Test Flat 2",
    location: "Paris",
    images: ["flat2.jpg"],
    added: { day: 15, month: "Feb", year: 2025 },
    url: "/properties/prop2.html",
  },
];

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ properties: mockProperties }),
    })
  );
  localStorage.clear();
});

describe("Property App Critical Functions", () => {
 it("renders property images correctly", async () => {
  // Set the base URL in the test environment
  const base = import.meta.env.BASE_URL || "/";

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  for (let property of mockProperties) {
    const img = await screen.findByTestId(`prop-img-${property.id}`);
    expect(img).toBeInTheDocument();
    
    
    expect(img).toHaveAttribute("src", `${base}${property.images[0]}`);
  }
});


  it("adds a property to favorites", async () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const addBtnFiltered = await screen.findByTestId("add-fav-prop1");
    expect(addBtnFiltered).toHaveTextContent("Add to Favorites");

    fireEvent.click(addBtnFiltered);

    const favList = screen.getByTestId("favorites-list");
    const removeBtnInFav = favList.querySelector(`[data-testid="add-fav-prop1"]`);

    expect(removeBtnInFav).toHaveTextContent("Remove from Favorites");
    expect(favList).toHaveTextContent("Test House 1");

    
    const stored = JSON.parse(localStorage.getItem("favoriteProperties"));
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe("prop1");
  });

  it("removes a property from favorites", async () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    // Add first
    const addBtnFiltered = await screen.findByTestId("add-fav-prop1");
    fireEvent.click(addBtnFiltered);

    // Remove
    const favList = screen.getByTestId("favorites-list");
    const removeBtnInFav = favList.querySelector(`[data-testid="add-fav-prop1"]`);
    fireEvent.click(removeBtnInFav);

    expect(favList).not.toHaveTextContent("Test House 1");
    expect(screen.getByText(/No favorite properties yet/i)).toBeInTheDocument();

    // localStorage should be empty
    const stored = JSON.parse(localStorage.getItem("favoriteProperties"));
    expect(stored).toHaveLength(0);
  });



it(" favorites in localStorage after refreshes", async () => {
    
    const { unmount } = render(<MemoryRouter><App /></MemoryRouter>);

    // Add first property to favorites
    const addBtn = await screen.findByTestId("add-fav-prop1");
    fireEvent.click(addBtn);

    // Check localStorage after adding
    let stored = JSON.parse(localStorage.getItem("favoriteProperties"));
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe("prop1");

    // Simulate refresh by unmounting and re-rendering
    unmount();
    render(<MemoryRouter><App /></MemoryRouter>);

    // Check that favorite is still displayed
    const favList = await screen.findByTestId("favorites-list");
    expect(favList).toHaveTextContent("Test House 1");

    // Check localStorage again
    stored = JSON.parse(localStorage.getItem("favoriteProperties"));
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe("prop1");
  });


  it("shows all properties if search is empty", async () => {
  render(<MemoryRouter><App /></MemoryRouter>);

  const searchBtn = screen.getByRole("button", { name: /Search Properties/i });
  userEvent.click(searchBtn);

  // Check the number of property cards rendered
  const allPropertyCards = await screen.findAllByTestId(/prop-card-/i);
  expect(allPropertyCards).toHaveLength(mockProperties.length);
});

});

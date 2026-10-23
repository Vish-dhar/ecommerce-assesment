import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const ART_GALLERY_PRODUCTS = [
  {
    id: 1,
    title: 'Ethereal Abstract Horizon Oil Painting',
    price: 340.00,
    description: 'Original textured oil painting on stretched linen canvas. Features deep indigo, muted gold, and warm amber tones inspired by coastal dusks.',
    category: 'Abstract',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.9, count: 42 }
  },
  {
    id: 2,
    title: 'Botanical Study Watercolor Composition',
    price: 180.00,
    description: 'Delicate hand-painted watercolor artwork capturing wild ferns and blossoms. Framed in natural blonde oak with anti-reflective museum glass.',
    category: 'Watercolor',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.8, count: 35 }
  },
  {
    id: 3,
    title: 'Minimalist Monolithic Acrylic Canvas',
    price: 450.00,
    description: 'Contemporary geometric acrylic painting showcasing striking contrast and structural depth. Signed and dated by the contemporary artist.',
    category: 'Modern',
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 5.0, count: 18 }
  },
  {
    id: 4,
    title: 'Impressionist Golden Autumn Landscape',
    price: 295.00,
    description: 'Rich impasto palette knife strokes depicting a serene woodland path under golden hour sunlight. Painted on heavy-duty cotton canvas.',
    category: 'Landscapes',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.7, count: 64 }
  },
  {
    id: 5,
    title: 'Chiaroscuro Vintage Portrait Study',
    price: 380.00,
    description: 'Classical oil study emphasizing dramatic light and shadow contrasts. Finished with a protective satin varnish layer.',
    category: 'Portraits',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.9, count: 29 }
  },
  {
    id: 6,
    title: 'Modern Expressionist Fluid Strokes',
    price: 220.00,
    description: 'Vibrant and energetic acrylic pour and brushwork blending deep blues, earthy siennas, and ivory accents.',
    category: 'Abstract',
    image: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.6, count: 51 }
  },
  {
    id: 7,
    title: 'Serene Misty Pine Forest Canvas',
    price: 310.00,
    description: 'Atmospheric landscape painting capturing a quiet morning fog rolling through tall evergreen pines.',
    category: 'Landscapes',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.8, count: 39 }
  },
  {
    id: 8,
    title: 'Geometric Harmony Color Block Print',
    price: 195.00,
    description: 'Bold modernist acrylic composition balancing geometric forms with striking color contrasts.',
    category: 'Modern',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.7, count: 27 }
  }
];

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ART_GALLERY_PRODUCTS);
      }, 300);
    });
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    selectedCategory: 'All',
    searchQuery: '',
    sortBy: 'featured',
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCategory, setSearchQuery, setSortBy } = productsSlice.actions;
export default productsSlice.reducer;
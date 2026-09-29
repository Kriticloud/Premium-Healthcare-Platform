import assert from "node:assert/strict";
import test from "node:test";
import { filterProviders, getProviderById, providers, type ProviderFilters } from "./providers.ts";
import { nextSampleWeekdayDate } from "./demoDates";

const defaults: ProviderFilters = {
  query: "",
  specialty: "all",
  location: "all",
  quickFilters: {
    topRated: false,
    availableToday: false,
    certified: false,
    premium: false,
  },
};

test("returns every provider when no filters are selected", () => {
  assert.equal(filterProviders(providers, defaults).length, providers.length);
});

test("search is case-insensitive and matches provider specialties", () => {
  const matches = filterProviders(providers, { ...defaults, query: "ORTHODONTICS" });
  assert.deepEqual(matches.map((provider) => provider.id), [2]);
});

test("combines specialty and location filters", () => {
  const matches = filterProviders(providers, {
    ...defaults,
    specialty: "cosmetic",
    location: "ca",
  });
  assert.deepEqual(matches.map((provider) => provider.id), [1]);
});

test("returns no providers for unmatched search queries", () => {
  assert.deepEqual(filterProviders(providers, { ...defaults, query: "no such clinic" }), []);
});

test("resolves a selected provider and rejects invalid IDs", () => {
  assert.equal(getProviderById("2")?.name, "Dr. Michael Rodriguez");
  assert.equal(getProviderById(undefined), undefined);
  assert.equal(getProviderById("../2"), undefined);
  assert.equal(getProviderById("999"), undefined);
});

test("produces the next requested weekday for sample availability", () => {
  const nextFriday = nextSampleWeekdayDate("Friday");
  assert.ok(nextFriday);
  const [year, month, day] = nextFriday.split("-").map(Number);
  assert.equal(new Date(year, month - 1, day).getDay(), 5);
  assert.equal(nextSampleWeekdayDate("Funday"), undefined);
});

test("combines quick filters rather than ignoring them", () => {
  const matches = filterProviders(providers, {
    ...defaults,
    quickFilters: { ...defaults.quickFilters, topRated: true, availableToday: true },
  });
  assert.deepEqual(matches.map((provider) => provider.id), [1, 3]);
});

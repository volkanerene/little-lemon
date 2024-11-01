import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const MenuFilters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onChange(index)}
          style={[
            styles.filterButton,
            { backgroundColor: selections[index] ? '#495e57' : '#edefee' },
            { flex: 1 / sections.length },
          ]}
        >
          <View>
            <Text style={[
              styles.filterText,
              { color: selections[index] ? '#edefee' : '#495e57' },
            ]}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  filterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 9,
    marginRight: 15,
  },
  filterText: {
    fontWeight: 'bold',
  },
});

export default MenuFilters;
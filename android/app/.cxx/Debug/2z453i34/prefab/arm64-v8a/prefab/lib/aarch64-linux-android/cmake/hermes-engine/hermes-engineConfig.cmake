if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/hyperlink/.gradle/caches/8.13/transforms/382e55fcee46f80de207e8dc1c08a8da/transformed/jetified-hermes-android-0.79.1-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/hyperlink/.gradle/caches/8.13/transforms/382e55fcee46f80de207e8dc1c08a8da/transformed/jetified-hermes-android-0.79.1-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()


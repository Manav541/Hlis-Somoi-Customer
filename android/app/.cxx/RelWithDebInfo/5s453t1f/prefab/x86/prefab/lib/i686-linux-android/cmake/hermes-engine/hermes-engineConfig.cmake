if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/hyperlink/.gradle/caches/8.13/transforms/f36c0b71b2d4a46a2b8fa6ce429b8e3d/transformed/jetified-hermes-android-0.79.1-release/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/hyperlink/.gradle/caches/8.13/transforms/f36c0b71b2d4a46a2b8fa6ce429b8e3d/transformed/jetified-hermes-android-0.79.1-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

